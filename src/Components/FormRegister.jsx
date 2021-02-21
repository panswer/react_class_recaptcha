import {Component} from 'react';

import axios from "axios";

class FormRegister extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            comment:'',
            'g-recaptcha-response':''
        }

        // this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.reCaptcha=this.reCaptcha.bind(this);
    }

    reCaptcha(token){
        console.log(token);
        if(this.state['g-recaptcha-response']!==token){
            this.setState({
                'g-recaptcha-response':token
            });
            axios.post('http://localhost:3001/send',this.state)
            .then(response=>{
                console.log(response);
                window.location.reload();
            })
            .catch(error=>{
                console.log(error);
            });
        }else{
            alert('no refresh');
        }
    }

    handleChange(e){
        if(e.target.type!=='submit'){
            this.setState({
                [e.target.name]:e.target.value
            });
        }
    }

    render(){
        window.reCaptcha=this.reCaptcha;
        return (
            <div className="">
                <form onSubmit={e=>e.preventDefault()}>
                    <input type="text" name="name" id="name" placeholder="nombre" onChange={this.handleChange} value={this.state.name}/>
                    <br/>
                    <input type="email" name="email" id="email" placeholder="correo" onChange={this.handleChange}value={this.state.email} />
                    <br/>
                    <textarea name="comment" id="comment" cols="30" rows="10" placeholder="comentario" onChange={this.handleChange} value={this.state.comment} />
                    <br/>
                    <button type="submit" className="g-recaptcha" data-sitekey={process.env.REACT_APP_SITE_KEY} data-callback="reCaptcha">Send</button>
                </form>
            </div>
        );
    }
}

export default FormRegister;