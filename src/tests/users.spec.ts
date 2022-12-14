import { UserRepo } from "../models/users";

const store = new UserRepo();

const userstest = describe('Users Models',()=>{

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
      });
    
      it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });
    
      it('create method should create a user', async () => {
        const result = await store.create({
         firstname:"Test",
         lastname:"test",
         password:"1234"
        });
        expect(result.firstname).toEqual("Test");
        expect(result.lastname).toEqual("test");
      });
    
      it('index method should return a list of Users', async () => {
        const result = await store.index();
        expect(result[0].firstname).toEqual('Test');
        expect(result[0].lastname).toEqual('test');
      });
    
      it('show method should return the correct user', async () => {
        const result = await store.show(1);
        expect(result.id).toEqual(1);
        expect(result.firstname).toEqual('Test');
        expect(result.lastname).toEqual('test');
      });
    

});

