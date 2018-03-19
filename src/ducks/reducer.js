import axios from "axios";

// CONSTANTS

const GET_POSTS = "GET_POSTS";
const GET_USER = "GET_USER";
const GET_LIKES = "GET_LIKES";
const SIGN_OUT = "SIGN_OUT";
const NEW_POST = "NEW_POST";
const SEARCH = "SEARCH";


// INITIAL STATE 

const initialState = {
  userLikes: [],
  userPosts: [],
  user: [],
  loggedIn: false,
  isLoading: false,
  didErr: false,
  errMessage: null,
  onNewPost: false,
  searchResults: []
};

// ACTION CREATORS



export function newPosts() {
  return {
    type: NEW_POST,
    payload: true
  }
}

export function leavingNewPost() {
  return {
    type: NEW_POST,
    payload: false
  }
}

export function getLikes() {
  return {
    type: GET_LIKES,
    payload: axios
      .get("/api/likes")
      .then(response => response.data)
      .catch(err => err.message)
  };
}

export function getPosts() {
  return {
    type: GET_POSTS,
    payload: axios
      .get("/api/posts")
      .then(response => response.data)
      .catch(err => err.message)
  };
}

export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .get("/api/user")
      .then(response => response.data)
      .catch(err => err.message)
  };
}
export function signOut() {
  return {
    type: SIGN_OUT,
    payload: axios
      .get("/api/signOut")
      .then(alert("you've been signed out"))
      .catch(err => err.message)
  };
}

export function search(par) {

  return {
    type: SEARCH,
    payload: axios.get(`/api/search/${par}`).then(response => response.data).catch(err => console.log(err))
  }
}


export default function reducer(state = initialState, action) {
  switch (action.type) {

    case NEW_POST:
      return Object.assign({}, state, {
        onNewPost: action.payload
      })


    case `${GET_POSTS}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_POSTS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        userPosts: action.payload
      });

    case `${GET_POSTS}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });

    case `${GET_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload,
        loggedIn: true
      });

    case `${GET_USER}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });

    case `${GET_LIKES}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_LIKES}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        userLikes: action.payload
      });

    case `${GET_LIKES}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });

    case `${SIGN_OUT}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${SIGN_OUT}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        loggedIn: false
      });

    case `${SIGN_OUT}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });


    case `${SEARCH}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${SEARCH}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        searchResults: action.payload
      });

    case `${SEARCH}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });



    default:
      return state;
  }
}
