import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminPanel.css'

function AdminPanel() {

    function getToken() {
        return sessionStorage.getItem('token');
    }

    const [subscription, setSubscription] = useState([]);
    const [shop, setShop] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const getSubscriptionCount = async () => {
            try {
                const response = await axios.get('https://localhost:7019/api/Subscriptions/ListSubscriptions', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                setSubscription(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const getUsersCount = async () => {
            try {
                const response = await axios.get('https://localhost:7019/api/Users/GetUsers', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getToken()
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const getShopCount = async () => {
            try {
                const response = await axios.get('https://localhost:7019/api/Shop/GetShop', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                setShop(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getShopCount();
        getUsersCount();
        getSubscriptionCount();
    }, []);

    return (
        <div className='admin-container'>
            <div className='subscriptions-table'>
                <div className="table-subscription">
                    <h1>Subscriptions</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope='col'>Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscription.map((subscriptions, index) => (
                                <tr key={index}>
                                    <td><img src={`${subscriptions.image}`} alt={subscriptions.name} style={{ width: 80, height: 100 }} /></td>
                                    <td>{subscriptions.id}</td>
                                    <td>{subscriptions.name}</td>
                                    <td>{subscriptions.description}</td>
                                    <td>{subscriptions.price} USD</td>
                                    <td><button className='del-btn' onClick={() => {
                                        const delId = subscriptions.id;

                                        axios({
                                            method: 'POST',
                                            url: 'https://localhost:7019/api/Subscriptions/DelSubscriptions',
                                            data: {
                                                "id": delId,
                                            },
                                            headers: {
                                                'Authorization': 'Bearer ' + getToken(),
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            }
                                        }).then((data) => {
                                            alert("Succsessfull!");
                                        });
                                    }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="table-shops">
                <h1>Users</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">User</th>
                            <th scope='col'>Role</th>
                            <th scope='col' colSpan={3}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((users, index) => (
                            <tr key={index}>
                                <td>{users.id}</td>
                                <td>{users.userName}</td>
                                <td>{users.email}</td>
                                <td><button className='del-btn' onClick={() => {
                                    const delId = users.userName;

                                    axios({
                                        method: 'POST',
                                        url: `https://localhost:7019/api/Users/DeleteUser?UserName=${delId}`,
                                        data: {
                                            "id": delId,
                                        },
                                        headers: {
                                            'Authorization': 'Bearer ' + getToken(),
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        }
                                    }).then((data) => {
                                        alert("Succsessfull!");
                                    });
                                }}>Delete</button>
                                </td>
                                <td><button className='del-btn' onClick={() => {
                                    const user = users.userName;
                                    axios({
                                        method: 'POST',
                                        url: `https://localhost:7019/api/Users/BlockUser?UserName=${user}`,
                                        headers: {
                                            'Authorization': 'Bearer ' + getToken(),
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        }
                                    }).then((data) => {
                                        alert("Succsessfull!");
                                    });
                                }}>Ban</button>
                                </td>
                                <td><button className='del-btn' onClick={() => {
                                    const user = users.userName;

                                    axios({
                                        method: 'POST',
                                        url: `https://localhost:7019/api/Users/UnblockUser?UserName=${user}`,
                                        headers: {
                                            'Authorization': 'Bearer ' + getToken(),
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        }
                                    }).then((data) => {
                                        alert("Succsessfull!");
                                    });
                                }}>Unban</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-shops">
                <h1>Shops</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">ID</th>
                            <th scope="col">Shops ID</th>
                            <th scope="col">Name</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shop.map((shops, index) => (
                            <tr key={index}>
                                <td><img src={`${shops.subscriptionImage}`} alt={shops.subscriptionName} style={{ width: 80, height: 100 }} /></td>
                                <td>{shops.id}</td>
                                <td>{shops.subscriptionId}</td>
                                <td>{shops.subscriptionName}</td>
                                <td>{shops.subscriptionPrice} USD</td>
                                <td><button className='del-btn' onClick={() => {
                                    const delId = shops.subscriptionId;

                                    axios({
                                        method: 'POST',
                                        url: `https://localhost:7019/api/Shop/DeleteShop?Id=${delId}`,
                                        data: {
                                            "id": delId,
                                        },
                                        headers: {
                                            'Authorization': 'Bearer ' + getToken(),
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        }
                                    }).then((data) => {
                                        alert("Succsessfull!");
                                    });
                                }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='edit-container'>
                <h1>Edit data</h1>
                <div className='create-subscriptions'>
                    <input type='text' placeholder="Enter name"></input>
                    <input type='text' placeholder="Enter image"></input>
                    <input type='text' placeholder="Enter description"></input>
                    <input type='text' placeholder="Enter price"></input>
                    <button>Create</button>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;
