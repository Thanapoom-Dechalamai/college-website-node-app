const { verifyAuthorization } = require("../helpers/auth.helper");
const imageService = require("../services/image.service");

const methods = {
    async onGetImage(req, res)
    {
        const authHeader = verifyAuthorization(req);
        console.log(authHeader);
        if (!authHeader?.user_role || !authHeader?.user_role_id)
        {
            return res.send({
                status: false,
                result: "The request headers doesn't contain authorization!",
            });
        }

        const result = await imageService.getImage(authHeader.user_role, authHeader.user_role_id);
        console.log(result);
        res.send({
            status: true,
            result: result[0]
        });
    }
};

module.exports = { ...methods };
