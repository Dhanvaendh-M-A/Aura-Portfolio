import mongoose from "mongoose"

export interface IContact {
  _id?: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

const ContactSchema = new mongoose.Schema<IContact>({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email"],
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
    maxlength: [200, "Subject cannot be more than 200 characters"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema)
