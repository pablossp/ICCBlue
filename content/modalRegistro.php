<div class="modal fade" id="modalRegistro" tabindex="-1" role="dialog" aria-labelledby="modalRegistroLabel" aria-hidden="true" style="z-index: 100000">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        		<h4 class="modal-title" id="modalRegistroLabel">Registrar Pedido</h4>
					</div>
					<div class="modal-body">
							<div class="panel panel-primary" style="padding: 10px">
								<div class="panel-heading">Datos Generales</div>
								<input id="modal-in-date" type="text" class="form-control" placeholder="dd/mm/aaaa" value="<?php 
										date_default_timezone_set('America/Tijuana'); 
										echo date("d/m/Y");
									?>" style="display: none">
									
								</input>
								<input id="modal-in-time" type="text" class="form-control" value="<?php 
										date_default_timezone_set('America/Tijuana'); 
										echo date("H:i");
									?>" style="display: none"></input>
								<label class="label label-default">Cliente</label>
								<select type="hidden" id="modal-in-cliente" type="text" class="form-control">
								</select>
								<label class="label label-default">Fecha de Vencimiento</label>
								<input id="modal-in-enddate" type="text" class="form-control" placeholder="dd/mm/aaaa" value="<?php 
										date_default_timezone_set('America/Tijuana'); 
										$date = strtotime("+7 day", time());
										echo date("d/m/Y", $date);
									?>" data-date-format="mm/dd/yyyy">
									
								</input>
								<label class="label label-default">Dirección de Destino</label>
								<textarea id="modal-in-address" rows="3" class="form-control" style="resize: none;"></textarea>
							</div>
							<div id="modal-div-productos" class="panel panel-primary" style="margin-top: 10px; padding: 10px">
								<div class="panel-heading">Productos</div>
								<label class="label label-default">Producto</label>
								<select id="inPdct" type="text" class="form-control">
								</select>
								<label class="label label-default">Cantidad</label>
								<input id="inpQty" type="text" class="form-control"></input>
								<div align="right">
									<button id="btnPushProduct" class="btn btn-default" style="margin-top: 5px">Añadir</button>
								</div>
								<table id="modal-table-mapped" class="table table-stripped table-bordered table-hover">
									<thead>
										<tr>
											<th>Producto</th>
											<th>Cantidad</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
							
							<div id="modal-div-servicios" class="panel panel-primary" style="margin-top: 10px; padding: 10px">
								<div class="panel-heading">Servicios</div>
								<label class="label label-default">Servicios</label>
								<textarea id="modal-in-servicios" rows="3" class="form-control" style="resize: none;"></textarea>
							</div>	

							<label class="label label-primary">Comentarios</label>
							<textarea id="modal-in-comments" rows="3" class="form-control" style="resize: none;"></textarea>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
		        		<button type="button" class="btn btn-primary" onclick="regOrder()"><span id="btn-reg-order">Registrar Pedido</span></button>
					</div>
				</div>
			</div>
		</div>
		<script>

		$("#btnPushProduct").click(function(){
			var pdct = $("#inPdct option:selected").text();
			var pdctval = $("#inPdct").val();
			var qty = $("#inpQty").val();
			if(qty > 0)
			{
					$content = "\
						<tr>\
							<td value=\""+pdctval+"\">\
								"+pdct+"\
							</td>\
							<td>\
								"+qty+"\
							</td>\
							<td>\
								<span class=\"glyphicon glyphicon-remove\" onclick=\"quitar_fila(this)\">\
							</td>\
							</tr>";

					$("#modal-table-mapped").find('tbody').append($content);
			}
			else
			{
				alert("Favor de ingresar la cantidad del producto");
			}
		});	
		</script>