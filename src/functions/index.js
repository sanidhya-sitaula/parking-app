import fire from "../fire";

// fire.firestore() => Access Firebase Database
const db = fire.firestore();

export const getAllStores = async (setStores) => {
  const stores = await db.collection(`/users/`).get();
  // React specific -- (React Hooks)
  setStores(stores.docs.map((doc) => doc.data()));
};

export const getAllSpaces = async (setSpaces) => {
  const spaces = await db.collection(`/spaces`).get();
  setSpaces(spaces.docs.map((doc) => doc.data()));
}


export const getSpotDetails = async (lat, lng, setSpot) => {
  const spaces = await db.collection(`/spaces`).get();
  
  spaces.docs.map(doc => {
    console.log(doc.data().coords.lat);
    if (doc.data().coords.lat == lat && doc.data().coords.lng == lng){
      setSpot(doc.data());
      console.log("here")
      return;
    }
  })
}

export const getReservations = async (user, setReservations) => {
  const allReservations = await db.collection(`/reservations`).get();
  console.log(allReservations);
  const response = []; 
  allReservations.docs.map(doc => {
    if (doc.data().byUser == user || doc.data().ownedBy == user) {
      response.push(doc.data());
    }
  })
  
  console.log(response);

  setReservations(response);

}

export const reserveSpace = async (lat, lng, user, price, available_start, available_end, address, email, vehicleType, plateNo) => {
  const reservation = {
    'coords' : {
      'lat' : lat,
      'lng' : lng
    },
    'byUser' : user,
    'address' : address,
    'available_start' : available_start,
    'available_end' : available_end, 
    'price' : price,
    'ownedBy' : email,
    'vehicle_type' : vehicleType,
    'vehicle_num': plateNo
  }; 

  await db.collection(`/reservations/`).add(reservation);
}

export const setFeaturedCollection = async (email, featuredCollection) => {
  await db.doc(`/users/${email}`).update({ featured: featuredCollection });
};

export const getUserDetails = (email, setUserDetails) => {
  db.doc(`/users/${email}`)
    .get()
    .then((doc) => setUserDetails(doc.data()));
};

export const getCategories = async (setCategories) => {
  const categories = await db.collection("/categories/").get();
  setCategories(categories.docs.map((doc) => doc.data()));
};

export const handleSetLocation = (email, latlng) => {
  db.doc(`/users/${email}`).update({ lat: latlng.lat, lng: latlng.lng });
};

export const handleEditProfile = (email, editedDetails) => {
  db.doc(`/users/${email}`).update({name : editedDetails.name, address : editedDetails.address, phone: editedDetails.phone, category : editedDetails.category})
}

export const handleLogin = (
  email,
  password,
  setEmailError,
  setPasswordError,
  setLoading
) => {
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
      }
    })
    .then(setLoading(false));
};


export const handleSubmitSpot = (
  email,
  address,
  coords,
  available_start,
  available_end,
  price,
  description,
  type,
) => {




  return db.collection(`/spaces/`).add({email: email, address: address, coords: coords, available_start: available_start, available_end: available_end, price: price, description: description, type: type});
}


export const handleSignUp = (
  email,
  password,
  setEmailError,
  setPasswordError
) => {

  console.log(email);
  console.log(password);

  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      console.log(err)
      switch (err.code) {
        
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    })
    .then((data) => {
      const userCredentials = {
        email: email,
      };
      return db.doc(`/users/${email}`).set(userCredentials);
    });
};

export const handleLogout = () => {
  fire.auth().signOut();
};

export const authListener = (setLoading, setUserDetails) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      getUserDetails(user.email, setUserDetails);
      setLoading(false);
    } else {
      setLoading(false);
    }
  });
};
