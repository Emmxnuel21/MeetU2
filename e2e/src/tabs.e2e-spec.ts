import { Browser, element, by, browser  } from "protractor";

describe('PRIMERA PRUEBA COMPROBACION PAGE LOGIN',()=>{
    beforeEach(()=>{
        browser.get("/");
    });

    it("LOGIN SE MUESTRA POR DEFECTO",()=>{
        expect(element(by.id("prueba1")).getText()).toContain("MeetU");
        browser.driver.sleep(3000);
    });  
});

            // SE ESPERA QUE INGRESE AL PAGE LOGIN 

///////////////////////////FIN PRUEBA 1///////////////////////////////////////////

describe('SEGUNDA PRUEBA REGISTRO',()=>{
    it("SE COMPRUEBA QUE ACCEDA A REGISTRO Y REGISTRE UN USUARIO",()=>{
        browser.driver.sleep(1000);
        expect(element(by.id("pruebaregistro")).click());
        browser.driver.sleep(1000);
        expect(element(by.xpath('//*[@id="usu"]/input')).sendKeys('juanito'));
        expect(element(by.xpath('//*[@id="pass"]/input')).sendKeys('juanito1234'));
        expect(element(by.id('save')).click());
        browser.driver.sleep(1000);
    })
})

            // SE ESPERA QUE DENTRO DEL PAGE LOGIN DESLICE EL REGISTRO DE USUARIO Y REGISTRE UNO

/////////////////////////////FIN PRUEBA 2////////////////////////////////////////

describe('TERCERA PRUEBA INICIO SESION',()=>{
    beforeEach(()=>{
        browser.get("/");
    });

    it("SE INGRESAN DATOS EN EL LOGIN DE USUARIO",()=>{
        browser.driver.sleep(1000);
        expect(element(by.xpath('/html/body/app-root/ion-app/ion-router-outlet/app-login/ion-content/div/div[2]/ion-list/ion-item[1]/ion-input/input')).sendKeys('juanito'));
        expect(element(by.xpath('/html/body/app-root/ion-app/ion-router-outlet/app-login/ion-content/div/div[2]/ion-list/ion-item[2]/ion-input/input')).sendKeys('juanito1234'));
        expect(element(by.id('ir')).click());
        browser.driver.sleep(1000);
    })
})

            // SE ESPERA QUE INGRESE AL LOGIN E INICIE SESION

/////////////////////////////FIN PRUEBA 3////////////////////////////////////////
