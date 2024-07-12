export default async function UseForPost() {
    const token = localStorage.getItem('token');
    if(token){
        const Login = document.querySelector('#Login')
        const Register = document.querySelector('#Register')
        const Profile = document.querySelector('#Profile')
        const Logout = document.querySelector('#logOut')
        Login.classList.add('hidden')
        Register.classList.add('hidden')
        Profile.classList.remove('hidden')
        Logout.classList.remove('hidden')
    }else{
        const Profile = document.querySelector('#Profile')
        const Logout = document.querySelector('#logOut')
        Profile.classList.add('hidden')
        Logout.classList.add('hidden')
        const Login = document.querySelector('#Login')
        const Register = document.querySelector('#Register')
        Login.classList.remove('hidden')
        Register.classList.remove('hidden')
    }  
}