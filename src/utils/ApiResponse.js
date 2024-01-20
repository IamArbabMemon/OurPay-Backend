export class ApiResponse {
    constructor(statusCode,data,message="Everything has been done successfully"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    };

}