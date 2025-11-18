import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Address } from "@/api";
import { useAuth } from "@/hooks";
import { initialValues, validationSchema } from "./AddressForm.form";

const addressCtrl = new Address();

export function AddressForm(props) {
    const { onClose, onReload, addressId, address } = props;
    const { user } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (addressId) {
                    await addressCtrl.update(formValue, addressId);
                } else {
                    await addressCtrl.create(formValue, user.id);
                }

                formik.handleReset();
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Input
                name="title"
                placeholder="Titulo de la dirección"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
            />

            <Form.Group widths="equal">
                <Form.Input
                    name="name"
                    placeholder="Nombre y apellidos"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />
                <Form.Input
                    name="address"
                    placeholder="Dirección"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.errors.address}
                />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input
                    name="district"
                    placeholder="Distrito"
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    error={formik.errors.district}
                />
                <Form.Input
                    name="region"
                    placeholder="Región"
                    value={formik.values.region}
                    onChange={formik.handleChange}
                    error={formik.errors.region}
                />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input
                    name="reference"
                    placeholder="Referencia"
                    value={formik.values.reference}
                    onChange={formik.handleChange}
                    error={formik.errors.reference}
                />
                <Form.Input
                    name="phone"
                    placeholder="Telefono"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.errors.phone}
                />
            </Form.Group>

            <Form.Button type="submit" fluid loading={formik.isSubmitting}>
                Enviar
            </Form.Button>
        </Form>
    );
}