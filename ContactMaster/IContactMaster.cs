using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactMaster
{
    public interface IContactMaster
    {
        Task<Response<CMS>> MergeAction(CMS cms);
        Task<Response<CMS>> Favourite(int id, bool isFavourite);
        Task<Response<CMS>> Fetch(int id = 0);
        Task<Response<CMS>> Delete(int id=0);
    }
}
