import jwt from 'jsonwebtoken'


const { verify } = jwt

const auth = (req, res, next) => {

    //const authHeader = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]
    const token = req.headers['Authorization']

    console.log(`Token: ${token}`)

    if(!token){
        return res.status(401).json({error: 'No token prvided'})
    }

    verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            return res.status(401).json({error: 'Failed to authenticate token'})
        }
        //req.user = user
        next()
    })
}

export { auth }