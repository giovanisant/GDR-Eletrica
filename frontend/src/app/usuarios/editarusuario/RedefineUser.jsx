import React from 'react'
import './RedefineUser.css';
import { Link } from 'react-router-dom';


function RedefineUser(){
    return (
        <div className="redefine">
            <div className='return'>
                <Link to="/" className="return-button">←
                Voltar</Link>
            </div>

            <h1>Redefinir Senha</h1>

            <form className="form-redefine">
                <div className='user-redefine'>
                    <p>Insira o endereço de e-mail verificado da sua conta de usuário e lhe enviaremos um link para redefinir sua senha.</p>

                    <input type="email" name='email' required placeholder='Email'/>

                </div>

                <div className='button-redefine'>
                    <button type='submit' className='redefine-button'>Enviar</button>
                </div>
            </form>
        </div>
            
    );
}

export default RedefineUser;