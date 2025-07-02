import { AppError } from "./AppError";

export async function validateGuest(guestId: string, token: string) {
    const guestRes = await fetch(`${process.env.CUSTOMER_SERVICE_URL}/guest/get/${guestId}`, {
        headers: {
            Authorization: token || "",
            "Content-Type": "application/json"
        }
    });
    if (!guestRes.ok) {
        const errorData = await guestRes.json();
        throw new AppError(errorData.message || "Failed to fetch guest details", guestRes.status);
    }
    const guestData = await guestRes.json();
    return guestData;
}

export async function validateGroupProfile(groupProfileId: string, token: string) {
    const groupProfileRes = await fetch(`${process.env.CUSTOMER_SERVICE_URL}/group-profile/get/${groupProfileId}`, {
        headers: {
            Authorization: token || "",
            "Content-Type": "application/json"
        }
    });
    if (!groupProfileRes.ok) {
        const errorData = await groupProfileRes.json();
        throw new AppError(errorData.message || "Failed to fetch group profile details", groupProfileRes.status);
    }
    const groupProfileData = await groupProfileRes.json();
    return groupProfileData;
}