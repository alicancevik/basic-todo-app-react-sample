import axios from "axios";

class TodoService {
    static async list() {
        const response = await axios.get('http://localhost:5065/api/todos');
        return response.data;
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:5065/api/todos/' + id);
        return response.data;
    }

    static async add(todo) {
        const response = await axios.post('http://localhost:5065/api/todos', todo);
        
        return response.data;
    }

    static async update(id, updatedTodo) {
        const response = await axios.put('http://localhost:5065/api/todos/' + id,updatedTodo);
        return response.data;
    }

    static async delete(id) {
        const response = await axios.delete('http://localhost:5065/api/todos/' + id);
        return response.data;
    }
}

export default TodoService;