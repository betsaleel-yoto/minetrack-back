const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getAll =  async(req,res)=>{
  try {
    const Users = await prisma.User.findMany();
    return res.status(201).json(Users) ;
  } catch (error) {
    console.error('Erreur lors de la récupération des Users :', error);
    throw error;
  }
}

const edit =async(req,res)=>{
  try {
    const { matriculationNumber,UserName,UserRole,UserTitle,matriculationNumberSadmin } = req.body;
    const { imatriculation } = req.params; // Récupérer le matriculationNumber des paramètres de la requête
    
    console.log(imatriculation, matriculationNumber);

    await prisma.$transaction(async(prisma)=>{
      const updatedUsers = await prisma.User.update({
        where: {
          matriculationNumber: imatriculation
        },
        data: {
          matriculationNumber,
          UserName,
          UserRole,
          UserTitle,
          matriculationNumberSadmin
        }
      });
      console.log('user updated:',updatedUsers)
      return res.status(201).json(updatedUsers);
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du user :', error);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour du User' });
  }
}

const delet = async(req,res)=>{
  try{
    const { imatriculation } = req.params;

    await prisma.$transaction(async(prisma)=>{
const DeleteUser= await prisma.User.delete({
  where:{
    matriculationNumber: imatriculation
  }
})
   
    console.log('user deleted:',DeleteUser);

    res.status(201).json({message: "user deleted successfully"})
  });
} catch(error){
console.error('Error deleting User:',error)
res.status(500).json({error:"Internal Server Error"})
}
}

module.exports={getAll,edit,delet}