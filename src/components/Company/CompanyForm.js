import React, { useState, useEffect } from 'react'
import * as CompanyServer from './CompanyServer';
import { useNavigate, useParams } from "react-router-dom";


export const CompanyForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    const initialState = { id: 0, name: "", foundation: 1950, website: "" };
    const [company, setCompany] = useState(initialState);

    const handleInputChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (!params.id) {
                res = await CompanyServer.registerCompany(company);
                const data = await res.json();
                if (data.message === "Success") {
                    setCompany(initialState);
                }
            } else {
                await CompanyServer.updateCompany(params.id, company);
            }
            navigate("/");

        } catch (error) {
            console.log(error);
        }
    }

    const getCompany = async (companyId) => {
        try {
            const res = await CompanyServer.getCompany(companyId);
            const data = await res.json();
            const { name, foundation, website } = data.company;
            setCompany({ name, foundation, website });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            getCompany(params.id);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className='col-md-3 mx-auto'>
            <h2 className='mb-3 text-center'>Compañia</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlform="exampleInputEmail1" className="form-label">Nombre: </label>
                    <input type="text" className="form-control" value={company.name} onChange={handleInputChange} id="exampleInputEmail1" name='name' min='2' maxLength='50' required />
                </div>
                <div className="mb-3">
                    <label htmlform="exampleInputPassword1" className="form-label">Fundada: </label>
                    <input type="number" className="form-control" value={company.foundation} onChange={handleInputChange} id="exampleInputPassword1" name='foundation' min='1900' max='2023' required />
                </div>
                <div className="mb-3">
                    <label htmlform="website" className="form-label">Website: </label>
                    <input type="text" className="form-control" value={company.website} onChange={handleInputChange} id="website" name='website' maxLength='100' required />
                </div>
                <div className='d-grid gap-2'>
                    {params.id ? (
                        <button type="submit" className="btn btn-block btn-primary">
                            Update
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-block btn-success">
                            Register
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
