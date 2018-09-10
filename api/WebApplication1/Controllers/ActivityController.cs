using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class ActivityController : ApiController
    {
        public IHttpActionResult GetAllActivityProducts()
        {
            try
            {
                using (var product = new ProductEntities())
                {
                    if (product.ActivityProducts.Count() == 0)
                        return Content(HttpStatusCode.NotFound, "Currently we have no activities");

                    return Ok(product.ActivityProducts.ToList());
                }
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        public IHttpActionResult PostActivityProduct(ActivityProduct activityProduct)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Model state is Invalid");

                using (var product = new ProductEntities())
                {
                    product.ActivityProducts.Add(activityProduct);
                    product.SaveChanges();
                }

                return Ok("Activity is added");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        [Route("api/product/activity/{id}/save")]
        public IHttpActionResult PutSaveActivityProduct(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Model state is invalid");

                using (var product = new ProductEntities())
                {
                    var activityProduct = new ActivityProduct();
                    activityProduct = product.ActivityProducts.Find(id);
                    if (activityProduct == null)
                        return Content(HttpStatusCode.NotFound, "Requested activity is not found");
                    else if (activityProduct.is_saved == true)
                        return Ok("Requested activity is already saved");
                    activityProduct.is_saved = true;
                    product.SaveChanges();
                }

                return Ok("Hotel is saved");
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, "Internal Server Error");
            }
        }

        [Route("api/product/activity/{id}/book")]
        public IHttpActionResult PutBookActivityProduct(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid request model");

            using (var product = new ProductEntities())
            {
                var activityProduct = new ActivityProduct();
                activityProduct = product.ActivityProducts.Find(id);
                if (activityProduct == null)
                    return Content(HttpStatusCode.NotFound, "Requested activity is not found");
                else if (activityProduct.is_booked == true)
                    return Ok("Requested activity is already booked");
                activityProduct.is_booked = activityProduct.is_saved = true;
                product.SaveChanges();
            }

            return Ok("Activity is booked");
        }
    }
}