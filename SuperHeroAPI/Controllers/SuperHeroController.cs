using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SuperHeroAPI.Data;
using SuperHeroAPI.Models;

namespace SuperHeroAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperHeroController : ControllerBase
    {
        private DataContext _context;

        public SuperHeroController(DataContext dataContext)
        {
            _context = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<SuperHero>>> GetSuperHeroes()
        {
            return Ok(await _context.SuperHeroes.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<SuperHero>>> CreateSuperHero(SuperHero newSuperHero)
        {
            _context.SuperHeroes.Add(newSuperHero);
            await _context.SaveChangesAsync();
            return Ok(await _context.SuperHeroes.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<SuperHero>>> UpdateSuperHero(SuperHero updateSuperHero)
        {
            var superHero = await _context.SuperHeroes.FindAsync(updateSuperHero.Id);

            if (superHero == null) return BadRequest("Super Hero not found.");

            superHero.Name = updateSuperHero.Name;
            superHero.FirstName = updateSuperHero.FirstName;
            superHero.LastName = updateSuperHero.LastName;
            superHero.Place = updateSuperHero.Place;

            await _context.SaveChangesAsync();

            return Ok(await _context.SuperHeroes.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<SuperHero>>> DeleteSuperHero(int id)
        {
            var superHero = await _context.SuperHeroes.FindAsync(id);

            if (superHero == null) return BadRequest("Super Hero not found.");

            _context.SuperHeroes.Remove(superHero);
            await _context.SaveChangesAsync();

            return Ok(await _context.SuperHeroes.ToListAsync());
        }
    }
}
