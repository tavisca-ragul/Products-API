using DataAccess;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class CarController : ApiController
    {
        public IHttpActionResult GetAllCarProducts()
        {
            try
            {
                using (var product = new ProductEntities())
                {
                    if(product.CarProducts.Count() == 0)
                        return Content(HttpStatusCode.NotFound, "Currently we have no cars");
              
                    return Ok(product.CarProducts.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        public IHttpActionResult PostCarProduct(CarProduct carProduct)
        {         
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Model state is Invalid");

                using (var product = new ProductEntities())
                {
                    product.CarProducts.Add(carProduct);
                    product.SaveChanges();
                }

                return Ok("Car is added");
            }
            catch(Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        [Route("api/product/car/{id}/save")]
        public IHttpActionResult PutSaveCarProduct(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Model state is invalid");

                using (var product = new ProductEntities())
                {
                    var carProduct = new CarProduct();
                    carProduct = product.CarProducts.Find(id);
                    if (carProduct == null)
                        return Content(HttpStatusCode.NotFound, "Requested car is not found");
                    else if (carProduct.is_saved == true)
                        return Ok("Requested car is already saved");
                    carProduct.is_saved = true;
                    product.SaveChanges();
                }

                return Ok("Car is saved");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        [Route("api/product/car/{id}/book")]
        public IHttpActionResult PutBookCarProduct(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid request model");

            using (var product = new ProductEntities())
            {
                var carProduct = new CarProduct();
                carProduct = product.CarProducts.Find(id);
                if (carProduct == null)
                    return Content(HttpStatusCode.NotFound, "Requested car is not found");
                else if (carProduct.is_booked == true)
                    return Ok("Requested car is already booked");
                carProduct.is_booked = carProduct.is_saved = true;
                product.SaveChanges();
            }

            return Ok("Car is booked");
        }
    }
}