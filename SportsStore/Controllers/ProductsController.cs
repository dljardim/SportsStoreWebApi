using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SportsStore.Models;
using System.Threading.Tasks;

namespace SportsStore.Controllers
{

    public class ProductsController : ApiController
    {
        private IRepository Repository { get; set; }


        public ProductsController()
        {
            Repository =
                (IRepository) GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof (IRepository));
        }

        public IEnumerable<Product> GetProducts()
        {
            return Repository.Products;
        }

        public IHttpActionResult GetProduct(int id)
        {
            Product result = Repository.Products.Where(p => p.Id == id).FirstOrDefault();
            if (result == null)
            {
                return (IHttpActionResult) BadRequest("No product found");
            }
            else
            {
                return Ok(result);
            }
        }

        [Authorize(Roles="Administrators")]
        public async Task<IHttpActionResult> PostProduct(Product product)
        {
            if (ModelState.IsValid)
            {
                await Repository.SaveProductAsync(product);
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles="Administrators")]
        public async Task DeleteProduct(int id)
        {
            await Repository.DeleteProductAsync(id);
        }

    }
}
