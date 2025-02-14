const jose = require('node-jose');

async function jwtEncryptRequest(
    data,
    keyId,
    publicKeyString,
    privateKeyString
) {
    const privateKey = await jose.JWK.asKey(privateKeyString, 'pem');
    const publicKey = await jose.JWK.asKey(publicKeyString, 'pem');

    // Create signed JWT
    const signedJWT = await jose.JWS.createSign({
        format: 'compact',
        fields: { kid: keyId }
    }, privateKey).update(JSON.stringify(data)).final();

    // Encrypt the signed JWT
    const encryptedJWT = await jose.JWE.createEncrypt({
        format: 'compact',
        fields: { kid: keyId }
    }, publicKey).update(signedJWT).final();

    return encryptedJWT;
}

async function createPaymentRequest(orderData) {
    const merchantId = process.env.HDFC_MERCHANT_ID;
    const keyId = process.env.HDFC_KEY_ID;
    const publicKey = process.env.HDFC_PUBLIC_KEY;
    const privateKey = process.env.HDFC_PRIVATE_KEY;

    const payload = {
        merchantId: merchantId,
        merchantOrderNo: orderData.orderId,
        amount: orderData.amount,
        currencyCode: "INR",
        returnUrl: `${process.env.FRONTEND_URL}/payment/callback`,
        message: "Surabhi Festival Registration Fee",
        email: orderData.email,
        mobileNo: orderData.phoneNumber,
        customerName: orderData.fullName,
        requestDateTime: new Date().toISOString()
    };

    const encryptedRequest = await jwtEncryptRequest(
        payload,
        keyId,
        publicKey,
        privateKey
    );

    return encryptedRequest;
}

module.exports = {
    jwtEncryptRequest,
    createPaymentRequest
};