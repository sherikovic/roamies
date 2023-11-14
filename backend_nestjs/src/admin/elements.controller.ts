import { Controller, Get } from "@nestjs/common";
import { ElementsService } from "./elements.service";

@Controller()
export class ElementsController {
    constructor(private readonly elementsService: ElementsService) { }

    @Get('elements')
    getElements(): {} {
        return this.elementsService.Elements_DUMMY;
    }
}
