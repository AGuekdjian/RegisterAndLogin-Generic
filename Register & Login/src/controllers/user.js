// Importar Dependencias y Modulos
const bcrypt = require('bcrypt')
const mongoosePagination = require("mongoose-pagination")
const fs = require("fs")
const path = require('path')

// Importar Modelos
const User = require('../models/user')

// Importar Servicios
const jwt = require("../services/jwt")

// Rutas
const register = async (req, res) => {
    let params = req.body

    if (!params.name || !params.surname || !params.email || !params.password) {
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    User.find({
        $or: [
            { email: params.email.toLowerCase() }
        ]
    }).exec(async (err, user) => {
        if (err) return res.status(500).json({ status: "error", message: "Error en la consulta de Usuario." })

        if (user && user.length >= 1) {
            return res.status(200).send({
                status: "Success",
                message: "El usuario ya existe!"
            })
        }

        let pwd = await bcrypt.hash(params.password, 10)
        params.password = pwd

        let user_to_save = new User(params)

        user_to_save.save((err, userStored) => {
            if (err || !userStored) return res.status(500).send({ status: "error", message: "Error al guardar el usuario!" })

            userStored.toObject()
            delete userStored.password
            delete userStored.role

            return res.status(200).json({
                status: "Success",
                message: "Usuario registrado correctamente!",
                user: userStored
            })
        })
    })
}

const login = (req, res) => {
    let params = req.body

    if (!params.email || !params.password) {
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    User.findOne(
        { email: params.email }
    ).exec((err, user) => {
        if (err || !user) return res.status(404).send({ status: "error", message: "No existe el usuario" });

        const pwd = bcrypt.compareSync(params.password, user.password)

        if (!pwd) {
            return res.status(400).send({
                status: "error",
                message: "No te has identificado correctamente"
            })
        }

        const token = jwt.createToken(user)

        return res.status(200).send({
            status: "Success",
            message: "Te has identificado correctamente",
            user: {
                id: user._id,
                name: user.name,
                surname: user.surname
            },
            token
        })
    })
}

const profile = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .select({ password: 0, role: 0 })
        .exec(async (error, userProfile) => {
            if (error || !userProfile) {
                return res.status(404).send({
                    status: "error",
                    message: "El usuario no existe o hay un error"
                });
            }

            return res.status(200).send({
                status: "success",
                user: userProfile,
            });
        });

}

const list = (req, res) => {
    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    page = parseInt(page);

    let itemsPerPage = 10;

    User.find().select("-password -email -role -__v").sort('_id').paginate(page, itemsPerPage, async (err, users, total) => {

        if (err || !users) {
            return res.status(404).send({
                status: "error",
                message: "No hay usuarios disponibles",
                err
            });
        }

        return res.status(200).send({
            status: "Success",
            users,
            page,
            itemsPerPage,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });
    });
}

const update = (req, res) => {
    let userIdentity = req.user;
    let userToUpdate = req.body;

    delete userToUpdate.iat;
    delete userToUpdate.exp;
    delete userToUpdate.role;
    delete userToUpdate.image;

    User.find({
        $or: [
            { email: userToUpdate.email.toLowerCase() }
        ]
    }).exec(async (error, users) => {
        if (error) return res.status(500).json({ status: "error", message: "Error en la consulta de usuarios" });

        let userIsset = false;
        users.forEach(user => {
            if (user && user._id != userIdentity.id) userIsset = true;
        });

        if (userIsset) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }

        if (userToUpdate.password) {
            let pwd = await bcrypt.hash(userToUpdate.password, 10);
            userToUpdate.password = pwd;
        } else {
            delete userToUpdate.password;
        }

        try {
            let userUpdated = await User.findByIdAndUpdate({ _id: userIdentity.id }, userToUpdate, { new: true });

            if (!userUpdated) {
                return res.status(400).json({ status: "error", message: "Error al actualizar" });
            }

            return res.status(200).send({
                status: "Success",
                message: "Usuario actualizado!",
                user: userUpdated
            });

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al actualizar",
            });
        }

    });
}

const upload = (req, res) => {
    if (!req.file) {
        return res.status(404).send({
            status: "error",
            message: "Petición no incluye la imagen"
        });
    }

    let image = req.file.originalname;

    const imageSplit = image.split("\.");
    const extension = imageSplit[1];

    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {

        const filePath = req.file.path;
        const fileDeleted = fs.unlinkSync(filePath);

        return res.status(400).send({
            status: "error",
            message: "Extensión del fichero invalida"
        });
    }

    User.findOneAndUpdate({ _id: req.user.id }, { image: req.file.filename }, { new: true }, (error, userUpdated) => {
        if (error || !userUpdated) {
            return res.status(500).send({
                status: "error",
                message: "Error en la subida del avatar"
            })
        }

        return res.status(200).send({
            status: "success",
            user: userUpdated,
            file: req.file,
        });
    });

}

const avatar = (req, res) => {
    const file = req.params.file;

    const filePath = "./uploads/avatars/" + file;

    fs.stat(filePath, (error, exists) => {

        if (!exists) {
            return res.status(404).send({
                status: "error",
                message: "No existe la imagen"
            });
        }

        return res.sendFile(path.resolve(filePath));
    });
}

module.exports = {
    register,
    login,
    list,
    update,
    upload,
    avatar,
    profile
}