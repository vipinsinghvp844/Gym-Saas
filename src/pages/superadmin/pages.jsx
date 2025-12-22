import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const Pages = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        api.get("/pages/list.php").then(res => {
            setPages(res.data.data);
        });
    }, []);

    return (
        <>
            <h2>Pages</h2>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Slug</th>
                        <th>Template</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>/{p.slug}</td>
                            <td>{p.template}</td>
                            <td>{p.status}</td>
                            <td>
                                <Link to={`/superadmin/pages/edit/${p.id}`}>
                                    Edit
                                </Link>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Pages;
