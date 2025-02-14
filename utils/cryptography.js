const cryptography = {
  hexToUint8Array: (hex) => {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  },
  decrypt: async (encryptedData) => {
    const config = useRuntimeConfig();
    const encryptionKey = config.public.encryptionKey;
    const encryptionAlgorithm = config.public.encryptionAlgorithm;

    try {
      const [ivHex, encryptedHex, authTagHex] = encryptedData.split(":");
      const iv = cryptography.hexToUint8Array(ivHex);
      const authTag = cryptography.hexToUint8Array(authTagHex);
      const keyHex = encryptionKey;
      const key = await crypto.subtle.importKey(
        "raw",
        cryptography.hexToUint8Array(keyHex),
        { name: encryptionAlgorithm },
        false,
        ["decrypt"]
      );
      const encryptedArray = cryptography.hexToUint8Array(encryptedHex);
      const combinedEncrypted = new Uint8Array([...encryptedArray, ...authTag]);
      const decrypted = await crypto.subtle.decrypt(
        {
          name: encryptionAlgorithm,
          iv: iv,
        },
        key,
        combinedEncrypted
      );
      return JSON.parse(new TextDecoder().decode(decrypted));
    } catch (error) {
      throw error;
    }
  },
};

export default cryptography;