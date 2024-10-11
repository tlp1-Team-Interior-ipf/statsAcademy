export const validationUser = (user, pass, usuarios, navigation, setModalVisible, setPass, setUser) => {
    const usuario = usuarios.find((u) => u.name === user.trim() && u.password === pass.trim());
    
    if (usuario) {
      navigation.navigate("Home");
      console.log("User:", usuario.name, " Pass:", usuario.password)
      setUser('')
      setPass('')
    } else {
      console.log("Usuario o contraseña incorrecta");
      setModalVisible(true)
    }
  }

  export const createUser = (emailCreate, usuarios, userCreate, passCreate, setUsers, navigation, setPassCreate, setEmailCreate, setUserCreate) => {

    const usuario = usuarios.find((u) => u.email === emailCreate.trim())

    if(!usuario) {
      const newUser = { name: userCreate, email: emailCreate, password: passCreate };
      setUsers([...usuarios, newUser]);
      console.log("¡Usuario creado!");
      console.log("Usuarios:", [...usuarios, newUser]);
      setPassCreate('');
      setEmailCreate('');
      setUserCreate('');
      navigation.navigate("Login");
    }
    else {
      console.log("Ya existe un usuario con ese email")
      console.log("Usuarios:", usuarios)
    }
  }



  export const editTask = (name, description, author, date) => {
    
  }