import {Schema, model} from "mongoose";
import {createHmac, randomBytes} from 'crypto';
import {createTokenForUser} from "../services/auth.js"


const userSchema =  new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "/images/default.webp",
    },
    role: {
        type: String,
        enum: ["USER", "ADMINN"],
        default: "USER",
    },
}, 
{timestamps: true}
);

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString("hex");

    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest("hex");

    user.salt = salt;
    user.password = hashedPassword;

    return next;
});

userSchema.static('matchPasswordAndGenerateToken', async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not Found!');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedhash = createHmac('sha256', salt)
        .update(password)
        .digest("hex");

    if (hashedPassword !== userProvidedhash) throw new Error('Incorrect Password!');

    const token = createTokenForUser(user);
    return token;
});

const User = model('user', userSchema);

export default User;