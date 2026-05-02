import { TErrorSources } from "../interfaces/error.interface";

export const handlerDuplicateError =(error:any) =>{
    let statusCode=400
    let message="Duplication Error"
    const field = Object.keys(error.keyValue)[0]
     const errorSources: TErrorSources = [
    {
      path: '',
      message: `${field} is already exists`,
    },
  ];
    return {
        statusCode,
        message,
        errorSources
    }
}