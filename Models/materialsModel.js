const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {textValidator}=require('../validation/TextValidation')

const getAll = (req,res)=>{
  res.send('salut')
  // try {
  //   const Materials = await prisma.Material.findMany();
  //   return res.status(201).json(Materials) ;
  // } catch (error) {
  //   console.error('Erreur lors de la récupération des Materials :', error);
  //   throw error;
  // }
}

const edit = async (req, res) => {
  try {
    const { MaterialName,RelatedShipment,InitialQte,CurrentQte,matriculationNumberSadmin } = req.body;
    const { id } = req.params; // Récupérer le matriculationNumber des paramètres de la requête
//validation


textValidator(CurrentQte,CurrentQte)

    await prisma.$transaction(async(prisma)=>{
      const updatedMaterial = await prisma.Material.update({
        where: {
          id: parseInt(id)
        },
        data: {
          MaterialName,
          RelatedShipment,
          InitialQte,
          CurrentQte,
          matriculationNumberSadmin
        }
      });
      console.log('Material updated:',updatedMaterial)
      return res.status(201).json(updatedMaterial);
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du updatedMaterial :', error);
    return res.status(500).json({ error: 'Erreur lors de la mise à jour du updatedMaterial' });
  }
}

const delet = async(req,res)=>{
  try{
    const { id } = req.params;

    await prisma.$transaction(async(prisma)=>{
const MaterialDelete= await prisma.Material.delete({
  where:{
   id:parseInt(id)
  }
})
   
    console.log('SuperAdmin deleted:',MaterialDelete);

    res.status(201).json({message: "Material deleted successfully"})
  });
} catch(error){
console.error('Error deleting Material:',error)
res.status(500).json({error:"Internal Server Error"})
}
}

const addMaterial = async (req, res) => {
  try {
    const { MaterialName, RelatedShipment, InitialQte, CurrentQte, matriculationNumberSadmin } = req.body;

    // Validation

textValidator(MaterialName,RelatedShipment)
textValidator(InitialQte,CurrentQte)
textValidator(matriculationNumberSadmin,matriculationNumberSadmin)

    // Créez un nouveau matériau en utilisant la méthode create de Prisma
    const newMaterial = await prisma.material.create({
      data: {
        MaterialName,
        RelatedShipment,
        InitialQte,
        CurrentQte,
        matriculationNumberSadmin,
      },
    });

    res.status(201).json({ message: 'Material added successfully', id: newMaterial.id, InitialQte: newMaterial.InitialQte });

  } catch (error) {
    console.error('Error adding material:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports={
  getAll,edit,delet,addMaterial
}