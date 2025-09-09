import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/useUser'

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    SignUp: 'SignUp'
})


export default function Authentication({authenticationMode}) {

    const { user, setUser, signUp, logIn } = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const signFunction = authenticationMode === AuthenticationMode.Login ? logIn : signUp
        
        signFunction().then(response => {
            navigate(authenticationMode === AuthenticationMode.Login ? '/' : '/login')
        })
        .catch(error => {
            alert(error)
        })
    }

    return (
        <div>
            <h3>{authenticationMode === AuthenticationMode.Login ? 'Log in' : 'Sign up'}</h3>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input placeholder='Email' type='email'
                    value={user.email}
                    onChange={e => setUser({...user, email: e.target.value})}

                />
                <label>Password</label>
                <input placeholder='Password' type='password' 
                 value={user.password}
                 onChange={e => setUser({...user, password: e.target.value})}
                 />
                <button type='submit'>{authenticationMode === AuthenticationMode.Login ? 'Log in' : 'Sign up'}</button>
                <Link to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/login'}>
                {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Log in'}</Link>
            </form>
        </div>
    )
}

