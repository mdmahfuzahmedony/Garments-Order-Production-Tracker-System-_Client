import React, { createContext, useEffect, useState } from 'react';
import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from 'firebase/auth';
import axios from 'axios'; // ১. Axios ইম্পোর্ট করতে হবে
import app from '../Firebase/Firebase'; 

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // 2. Sign In (Login)
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // 3. Google Sign In
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // 4. Log Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // 5. Update Profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photo
        });
    };

    // 6. Observer (User state change handle + JWT Token Logic)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            
            // JWT Token Management
            if (currentUser) {
                // ইউজার লগইন থাকলে টোকেন জেনারেট এবং কুকি সেট করা
                const userInfo = { email: currentUser.email };
                
                axios.post('http://localhost:2001/jwt', userInfo, { withCredentials: true })
                    .then(res => {
                        if (res.data.success) {
                            // console.log('Token set successfully in cookie');
                            setLoading(false); // টোকেন সেট হওয়ার পর লোডিং বন্ধ
                        }
                    })
                    .catch(error => {
                        console.error('JWT Error:', error);
                        setLoading(false);
                    });

            } else {
                // ইউজার লগআউট হলে কুকি মুছে ফেলা
                axios.post('http://localhost:2001/logout', {}, { withCredentials: true })
                    .then(res => {
                        if (res.data.success) {
                            // console.log('Token cleared');
                            setLoading(false);
                        }
                    })
                    .catch(error => {
                        console.error('Logout Error:', error);
                        setLoading(false);
                    });
            }
        });

        return () => {
            return unsubscribe();
        }
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,
        setLoading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;