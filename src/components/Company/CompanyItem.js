import React from 'react'
import * as CompanyServer from "./CompanyServer";
import { useNavigate } from 'react-router-dom';

export const CompanyItem = ({ company, listCompanies }) => {

    const navigate = useNavigate();

    const handleDelete = async (companyId) => {
        await CompanyServer.deleteCompany(companyId);
        listCompanies();
    };

    return (
        <div className='col-md-3 mb-4'>
            <div className='card  text-center'>
                <div className='card-header'>
                    <h3 className='card-title '>{company.name} </h3>
                </div>
                <div className=' card-body'>
                    <p className='card-text'>Fundada: {company.foundation}</p>
                    <a className='' href={company.website} target='_blank' rel='nooponer noreferrer'> Go to website</a>
                </div>
                <div className=' card-footer'>
                    <button className='btn btn-sm btn-info mx-2' onClick={() => navigate(`/updateCompany/${company.id}`)}>
                        Editar
                    </button>
                    <button onClick={() => company.id && handleDelete(company.id)} className="btn btn-sm btn-danger  ">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}
