

class ApiResponse {
    public success : boolean;
    public message : string;
    public statusCode : number;
    public data : Object; 

    constructor(message : string, statusCode : number, data : Object) {
        this.message = message;
        this.statusCode = statusCode;
        this.success = true;
        this.data = data;
    }
}

export default ApiResponse;