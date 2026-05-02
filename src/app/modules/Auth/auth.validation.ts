import z from "zod";

const loginValidationSchema =z.object({
    email:z.string().nonempty()
})