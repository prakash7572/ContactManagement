﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactMaster
{
    public interface IContactMaster
    {
        Task<Response<CMS>> MergeActionAsync(CMS cms);    
        Task<CMS> Fetch(int id=0);
        Task<CMS> Delete();
    }
}
