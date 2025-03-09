import { Request, Response } from "express";
import { AdoptionForm, AdoptionRequest } from "./model";

declare module "express" {
    interface Request {
        user?: {
            id: string;
        };
    }
}

class AdoptionFormController {
    static async createAdoptionForm(req: Request, res: Response) {
        try {
            const newAdoptionForm = new AdoptionForm(req.body);
            await newAdoptionForm.save();
            res.status(201).json(newAdoptionForm);
        } catch (err) {
if (err instanceof Error) {
            res.status(500).json({ error: err.message });
} else {
                res.status(500).json({ error: "Unknown error" });
            }
        }
    }

    static async updateAdoptionForm(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedAdoptionForm = await AdoptionForm.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedAdoptionForm) {
                return res.status(404).json({ error: "Formulario de adopción no encontrado" });
            }
            res.status(200).json(updatedAdoptionForm);
        } catch (err) {
if (err instanceof Error) {
            res.status(500).json({ error: err.message });
} else {
                res.status(500).json({ error: "Unknown error" });
            }
        }
    }

    static async getAdoptionFormById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const adoptionForm = await AdoptionForm.findById(id);
            if (!adoptionForm) {
                return res.status(404).json({ error: "Formulario de adopción no encontrado" });
            }
            res.status(200).json(adoptionForm);
        } catch (err) {
if (err instanceof Error) {
            res.status(500).json({ error: err.message });
} else {
                res.status(500).json({ error: "Unknown error" });
            }
        }
    }

    static async createAdoptionRequest(req: Request, res: Response) {
        try {
            const { pet, message } = req.body;
            const adopter = req.user?.id; // Se obtiene del token

            const newRequest = new AdoptionRequest({ adopter, pet, message });
            await newRequest.save();

            res.status(201).json(newRequest);
        } catch (err) {
if (err instanceof Error) {
            res.status(500).json({ error: err.message });
} else {
                res.status(500).json({ error: "Unknown error" });
            }
        }
    }
}

export default AdoptionFormController;
