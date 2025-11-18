import React from 'react'
import { Form } from "semantic-ui-react";
import { initialValues, validationSchema } from './LoginForm.form';
import { useFormik } from 'formik';
import { Auth } from "@/api";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
const authCtrl = new Auth();
export function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    console.log(useAuth());

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const response = await authCtrl.login(formValue);
                login(response.jwt);
                console.log(response);
                // router.push("/");
            }//ME QUEDO AQUI SABER POR QUE LUEGO DE TENER EL RESPONSE LE MANDO A LOGIN Y COMO SE ACTUALIZA ESE RESPONSE CON EL VALOR QUE ENVIE A LOGIN
            catch (error) {
                console.log(error);
            }
        }
    })




    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input name="identifier" type="text" placeholder="Correo Electronico o nombre de usuario"
                value={formik.values.identifier}
                onChange={formik.handleChange}
                error={formik.errors.identifier} />


            <Form.Input name="password" type="password" placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Form.Button type="submit" fluid loading={formik.isSubmitting}>Entrar</Form.Button>
        </Form>


    );
}
