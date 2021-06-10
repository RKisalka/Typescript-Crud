import { request, Request, Response } from 'express'
import { isParameter } from 'typescript';
import Photo from '../models/Photo';


export async function getPhotos(req: Request, res:Response): Promise<Response> {
    const photos = await Photo.find().sort({_id:-1});
    return res.json(photos);
}

// export async function getPhoto(req: Request, res:Response): Promise<Response> {
//     const { id } = req.params;
//     const photo = await Photo.findById(id);
//     return res.json({photo});
// }


export async function getPhoto(req: Request, res:Response) {
    try{
    const { id } = req.params;
    const photo = await Photo.findById(id);
if(photo){
    return res.json({
        code:200,
        data:photo,
        message:'success'
    });
}
} catch (error) {
    return res.status(400).json({
        code:400,
        message:'not found'    
    });
  }
};



export async function createPhoto(req: Request, res:Response): Promise<Response> {

    const { title, description } = req.body;
    const newPhoto = {
        title: title,
        description: description
    };
    const photo = new Photo(newPhoto);
    await photo.save();

    console.log('Saving photo')
    console.log(req.body)

    return res.json({
        code : 200,
        message : 'Success'
    })
    
}

// export async function deletePhoto(req: Request, res:Response): Promise<Response> {
//     const { id } = req.params;
//     const photo = await Photo.findByIdAndRemove(id);
//     return res.json({
//         code : 200,
//         message : 'Success'
//     });
// }


export async function deletePhoto(req:Request,res:Response):Promise<Response>{
    try{
     const {id}=req.params;
     const photo=await Photo.findByIdAndRemove(id);
 
     return res.json({
        code : 200,
        message : 'Success'         
     })
 } catch (error) {
    return res.status(400).json({
        code:400,
        message:'not found'    
    });
   }
 };

// export async function updatePhoto(req: Request, res:Response): Promise<Response> {
//     const { id } = req.params;
//     const { title, description } = req.body;
//     console.log(req.body)
//     const updatePhoto = await Photo.findByIdAndUpdate(id, {
//         title,
//         description
//     });
//     return res.json({
//         code : 200,
//         message : 'Success'
//     });
// }

export async function updatePhoto(req: Request, res:Response): Promise<Response> {
    try{
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(req.body)
    const updatePhoto = await Photo.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        code : 200,
        message : 'Success'
    });
}catch (error) {
    return res.status(400).json({
        code:400,
        message:'not found'    
    });
  }
};



  