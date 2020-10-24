using System.Collections.Generic;
using System.Threading.Tasks;
using BooksApi.Models;
using DemoRM.Data.Repository.Interface;
using MongoDB.Driver;

namespace DemoRM.Services
{
    public class BookService
    {
        private readonly IMongoCollection<Book> _books;
        public BookService(IBookstoreDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var db = client.GetDatabase(settings.DatabaseName);

            _books = db.GetCollection<Book>(settings.BooksCollectionName);
        }

        public async Task<List<Book>> Get() 
        {
            return await _books.Find(book => true).ToListAsync();
        } 

        public async Task<Book> Get(string id) 
        {
            return await _books.Find<Book>(book => book.Id == id).FirstOrDefaultAsync();
        }

        public Book Create(Book book)
        {
            _books.InsertOne(book);
            
            return book;
        }

        public void Update(string id, Book bookIn)
        {
            _books.ReplaceOne(book => book.Id ==id, bookIn);
        }

        public void Remove(Book bookIn)
        {
            _books.DeleteOne(book => book.Id == bookIn.Id);
        }

        public void Remove(string id)
        {
            _books.DeleteOne(book => book.Id == id);
        }
    }
}