import mongoose from 'mongoose'

interface DatabaseProps {
    user: string
    password: string
}

export default class Database {

    constructor(private props: DatabaseProps) {}

    public connect() {
        mongoose.set("strictQuery", false);
        mongoose.connect(`mongodb+srv://${this.props.user}:${this.props.password}@clusterblog.0lqj7jz.mongodb.net/blog?retryWrites=true&w=majority`)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error:', err)
            })
    }
}