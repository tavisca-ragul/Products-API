using DataAccess;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class HotelController : ApiController
    {
        public IHttpActionResult GetAllHotelProducts()
        {
            try
            {
                using (var product = new ProductEntities())
                {
                    if (product.HotelProducts.Count() == 0)
                        return Content(HttpStatusCode.NotFound, "Currently we have no hotels");

                    return Ok(product.HotelProducts.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        public IHttpActionResult PostHotelProduct(HotelProduct hotelProduct)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Model state is Invalid");

                using (var product = new ProductEntities())
                {
                    product.HotelProducts.Add(hotelProduct);
                    product.SaveChanges();
                }

                return Ok("Hotel is added");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        [Route("api/product/hotel/{id}/save")]
        public IHttpActionResult PutSaveHotelProduct(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Model state is invalid");

                using (var product = new ProductEntities())
                {
                    var hotelProduct = new HotelProduct();
                    hotelProduct = product.HotelProducts.Find(id);
                    if (hotelProduct == null)
                        return Content(HttpStatusCode.NotFound, "Requested hotel is not found");
                    else if (hotelProduct.is_saved == true)
                        return Ok("Requested hotel is already saved");
                    hotelProduct.is_saved = true;
                    product.SaveChanges();
                }

                return Ok("Hotel is saved");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        [Route("api/product/hotel/{id}/book")]
        public IHttpActionResult PutBookHotelProduct(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid request model");

            using (var product = new ProductEntities())
            {
                var hotelProduct = new HotelProduct();
                hotelProduct = product.HotelProducts.Find(id);
                if (hotelProduct == null)
                    return Content(HttpStatusCode.NotFound, "Requested hotel is not found");
                else if (hotelProduct.is_booked == true)
                    return Ok("Requested hotel is already booked");
                hotelProduct.is_booked = hotelProduct.is_saved = true;
                product.SaveChanges();
            }

            return Ok("Hotel is booked");
        }
    }
}