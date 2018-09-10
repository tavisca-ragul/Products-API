using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class AirController : ApiController
    {
        public IHttpActionResult GetAllAirProducts()
        {
            try
            {
                using (var product = new ProductEntities())
                {
                    if (product.AirProducts.Count() == 0)
                        return Content(HttpStatusCode.NotFound, "Currently we have no flights");

                    return Ok(product.AirProducts.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        public IHttpActionResult PostAirProduct(AirProduct airProduct)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Model state is Invalid");

                using (var product = new ProductEntities())
                {
                    product.AirProducts.Add(airProduct);
                    product.SaveChanges();
                }

                return Ok("Flight is added");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        [Route("api/product/air/{id}/save")]
        public IHttpActionResult PutSaveAirProduct(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Model state is invalid");

                using (var product = new ProductEntities())
                {
                    var airProduct = new AirProduct();
                    airProduct = product.AirProducts.Find(id);
                    if (airProduct == null)
                        return Content(HttpStatusCode.NotFound, "Requested flight is not found");
                    else if (airProduct.is_saved == true)
                        return Ok("Requested flight is already saved");
                    airProduct.is_saved = true;
                    product.SaveChanges();
                }

                return Ok("Flight is saved");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        [Route("api/product/air/{id}/book")]
        public IHttpActionResult PutBookAirProduct(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid request model");

            using (var product = new ProductEntities())
            {
                var airProduct = new AirProduct();
                airProduct = product.AirProducts.Find(id);
                if (airProduct == null)
                    return Content(HttpStatusCode.NotFound, "Requested flight is not found");
                else if (airProduct.is_booked == true)
                    return Ok("Requested flight is already booked");
                airProduct.is_booked = airProduct.is_saved = true;
                product.SaveChanges();
            }

            return Ok("Flight is booked");
        }
    }
}