import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [toggle, setToggle] = useState(true);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDesc, setProductDesc] = useState("");
    // categories
    const [categories, setCategories] = useState([
        {
            categoryId: "Please",
            categoryName: "Wait",
            categoryComment: "Loading...",
        },
    ]);
    const [products, setProducts] = useState([
        {
            productId: "Please Wait",
            productName: "Loading",
            productCategory: "....",
            productDesc: "...",
        },
    ]);

    const createCategory = useCallback((id, name, comment) => {
        console.log(id + " " + name + " " + comment);
        axios
            .post("http://localhost:3333/create-category", {
                categoryId: id,
                categoryName: name,
                categoryComment: comment,
            })
            .then((res) => {
                console.log(res.data);
                setName("");
                setId("");
                setComment("");
                fetchCategory();
            });
    }, []);
    const createProduct = useCallback((id, name, category, desc) => {
        axios
            .post("http://localhost:3333/create-product", {
                productId: id,
                productName: name,
                productCategory: category,
                productDesc: desc,
            })
            .then((res) => {
                console.log(res.data);
                setProductName("");
                setProductId("");
                setProductCategory("");
                setProductDesc("");
                fetchProduct();
            });
    }, []);

    const fetchCategory = useCallback(() => {
        axios.get("http://localhost:3333/all-category").then((res) => {
            setCategories(res.data);
            console.log(categories);
        });
    }, []);
    const fetchProduct = useCallback(() => {
        axios.get("http://localhost:3333/all-product").then((res) => {
            setProducts(res.data);
            console.log(products);
        });
    }, []);

    useEffect(() => {
        fetchCategory();
        fetchProduct();
    }, []);
    return (
        <>
            {toggle ? (
                <>
                    <h1>Add Category</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createCategory(id, name, comment);
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Category Id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="category Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button type="submit">Create Category</button>
                    </form>

                    <div
                        style={{ backgroundColor: "green", padding: "2px" }}
                        onClick={() => setToggle(false)}
                    >
                        {" "}
                        Add Product
                    </div>
                    <h2>Hello</h2>
                    <table border="1">
                        <tr>
                            <th>Category Id</th>
                            <th>Category Name</th>
                            <th>Category Comment</th>
                        </tr>
                        {categories.map((data, index) => (
                            <tr key={"row" + index}>
                                <td>{data["categoryId"]}</td>
                                <td>{data["categoryName"]}</td>
                                <td>{" " + data["categoryComment"]}</td>
                            </tr>
                        ))}
                    </table>
                </>
            ) : (
                <>
                    <h1>Add New Product</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createProduct(
                                productId,
                                productName,
                                productCategory,
                                productDesc
                            );
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Product Id"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        {/* <select name="" id=""></select> */}
                        <select
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                        >
                            {categories.map((data, index) => (
                                <option
                                    value={data["categoryName"]}
                                    key={"proCat" + index}
                                >
                                    {data["categoryName"]}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Product Description"
                            value={productDesc}
                            onChange={(e) => setProductDesc(e.target.value)}
                        />
                        <button type="submit">Create Product</button>
                    </form>

                    <span
                        style={{ backgroundColor: "blue", padding: "2px" }}
                        onClick={() => setToggle(false)}
                    >
                        {" "}
                        Create Category
                    </span>
                    <table border="1">
                        <tr>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Product Category</th>
                            <th>Product description</th>
                        </tr>
                        {products.map((data, index) => (
                            <tr key={"row" + index}>
                                <td>{data["productId"]}</td>
                                <td>{data["productName"]}</td>
                                <td>{data["productCategory"]}</td>
                                <td>{data["productDesc"]}</td>
                            </tr>
                        ))}
                    </table>
                </>
            )}
        </>
    );
}
