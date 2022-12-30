import mongoose from 'mongoose'

interface DatabaseProps {
    user: string
    password: string
}

export default class Database {

    constructor(private props: DatabaseProps) {}

    public async connect() {
        mongoose.set("strictQuery", false);

        try {
            return await mongoose.connect(`mongodb+srv://${this.props.user}:${this.props.password}@clusterblog.0lqj7jz.mongodb.net/blog?retryWrites=true&w=majority`)
            
        } catch (err) {
            console.error('Database connection error:', err)
        
        } finally {    
            console.log('Database connection successful')
        }       
    }
}