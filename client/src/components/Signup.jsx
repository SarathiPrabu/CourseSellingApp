function Signup(){

    return(
        <div>
            <center>
                <div style={{
                    fontSize : 45,
                    margin : 20,
                    padding: 10
                }}>
                    Welcome to Signup
                </div>
            </center>
            <center>
                <div style={{
                    border: "2px solid black",
                    background: "black"
                }}>
                    Username - <input type={"text"}/> <br/>
                    Password - <input type={"password"}/><br/>
                    <button>Sign Up</button>
                </div>
            </center>

        </div>
    )
}

export default Signup