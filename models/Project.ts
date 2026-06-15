import mongoose from "mongoose"

export interface IProject {
  _id?: string
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
  createdAt: Date
}

const ProjectSchema = new mongoose.Schema<IProject>({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  tags: {
    type: [String],
    required: [true, "Please provide at least one tag"],
  },
  githubUrl: {
    type: String,
    required: [true, "Please provide a GitHub URL"],
  },
  liveUrl: {
    type: String,
    required: [true, "Please provide a live URL"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema)
