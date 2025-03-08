import { Request, Response } from "express";
import HTTP_STATUS from "../../constants/HttpStatus";
import PetService from "./service";
import apiResponse from "../../utils/apiResponse.utils";
import { v2 as cloudinary } from 'cloudinary';
import { PetCreateFields } from "./interface";


export default class PetController {
    static async createPet(req: Request, res: Response): Promise<void> {
        try {
          
          const files = req.files as Express.Multer.File[];
      
          let imageUrls: string[] = [];
      
          
          if (files && files.length > 0) {
            const uploadPromises = files.map((file) => cloudinary.uploader.upload(file.path));
            const cloudinaryResponses = await Promise.all(uploadPromises);
            imageUrls = cloudinaryResponses.map((response) => response.secure_url); 
          }
      
         
          const petData: PetCreateFields = {
            ...req.body,
            photos: imageUrls, 
          };
      
          
          const newPet = await PetService.createPet(petData);
      
          res.status(HTTP_STATUS.CREATED).json(apiResponse(true, newPet));
        } catch (err: any) {
          res.status(err.status || HTTP_STATUS.SERVER_ERROR)
             .json(apiResponse(false, err.message));
        }
      }

    static async getPet(req: Request, res: Response) {
        try {
            const pet = await PetService.getPetById(req.params.id);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, pet));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async updatePet(req: Request, res: Response) {
        try {
            const updatedPet = await PetService.updatePet(req.params.id, req.body);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, updatedPet));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async deletePet(req: Request, res: Response) {
        try {
            const result = await PetService.deletePet(req.params.id);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, result));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async getAllPets(req: Request, res: Response) {
        try {
            const filters = req.query;
            const pets = await PetService.getAllPets(filters);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, pets));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }

    static async getPetsByShelter(req: Request, res: Response) {
        try {
            const shelterId = req.params.shelterId;
            const pets = await PetService.getPetsByShelterId(shelterId);
            res.status(HTTP_STATUS.OK).json(apiResponse(true, pets));
        } catch (err: any) {
            res.status(err.status || HTTP_STATUS.SERVER_ERROR)
               .json(apiResponse(false, err));
        }
    }    

}