import * as Yup from "yup";

export function initialValues(address) {
    return {
        title: address?.title || "",
        name: address?.name || "",
        address: address?.address || "",
        district: address?.district || "",
        region: address?.region || "",
        reference: address?.reference || "",
        phone: address?.phone || "",
    };
}

export function validationSchema() {
    return Yup.object({
        title: Yup.string().required(true),
        name: Yup.string().required(true),
        address: Yup.string().required(true),
        district: Yup.string().required(true),
        region: Yup.string().required(true),
        reference: Yup.string().required(true),
        phone: Yup.number().required(true),
    });
}
