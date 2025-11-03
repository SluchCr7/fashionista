'use client'
import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import swal from 'sweetalert';
import Notify from '../Components/Notify';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // ✅ Register
  const Register = async (email, name, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`, {
        email,
        name,
        password,
      });
      swal('Good job!', res.data.message, 'success');
      setTimeout(() => (window.location.href = '/Login'), 2000);
    } catch (err) {
      swal('Oops!', err?.response?.data?.message || 'Registration Failed', 'error');
    }
  };

  // ✅ Login
  const Login = async (email, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`, {
        email,
        password,
      });
      setUser(res.data);
      setIsLogin(true);
      localStorage.setItem('Data', JSON.stringify(res.data));
      localStorage.setItem('loginState', 'true');
      swal('Welcome back!', 'Login successful', 'success');
      setTimeout(() => (window.location.href = '/'), 1500);
    } catch (err) {
      swal('Oops!', err?.response?.data?.message || 'Login Failed', 'error');
    }
  };

  // ✅ Logout
  const Logout = () => {
    swal({
      title: 'Are you sure?',
      text: 'You are about to log out!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        setUser(null);
        setIsLogin(false);
        localStorage.removeItem('Data');
        localStorage.removeItem('loginState');
        window.location.href = '/Login';
      }
    });
  };

  // ✅ تحقق من حالة المستخدم عند التحميل
  useEffect(() => {
    const storedUser = localStorage.getItem('Data');
    const loginState = localStorage.getItem('loginState');

    if (storedUser && loginState === 'true') {
      setUser(JSON.parse(storedUser));
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setIsAuthChecked(true);
  }, []);

  // ✅ جلب جميع المستخدمين
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ إضافة / إزالة منتج من المفضلة
    const AddFavourite = async (prodId) => {
    if (!user) {
        setMessage('Please login first');
        setTimeout(() => setMessage(''), 3000);
        return;
    }

    try {
        const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/favorite/${prodId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
        );

        const { message, isFavorite } = res.data;
        setMessage(message);
        setTimeout(() => setMessage(''), 2500);

        // تحديث بيانات المستخدم في LocalStorage
        const storedData = JSON.parse(localStorage.getItem('Data'));
        if (storedData) {
        if (isFavorite) {
            if (!storedData.favorites.includes(prodId)) {
            storedData.favorites.push(prodId);
            }
        } else {
            storedData.favorites = storedData.favorites.filter((id) => id !== prodId);
        }
        localStorage.setItem('Data', JSON.stringify(storedData));
        }

        // إرجاع الحالة الجديدة لتحديث الـ UI
        return isFavorite;
    } catch (err) {
        console.error(err);
        setMessage('Something went wrong');
        setTimeout(() => setMessage(''), 3000);
    }
    };


  return (
    <div className="relative">
      <Notify Notify={message} />
      <UserContext.Provider
        value={{
          user,
          users,
          Logout,
          Login,
          Register,
          AddFavourite,
          isLogin,
          isAuthChecked,
        }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserContextProvider;
