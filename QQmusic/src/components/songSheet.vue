<template>
	<div id="sheet">
		<h2 class="title">
			{{tName}}
		</h2>
		<div class="sheetBox">
			<ul class="sheetList">
				<li class="item" v-for="(v,index) in sheetData">
					<div class="bigBox">
						<div class="imgBox">
							<img :src="v.picUrl">
							<span class="playIcon"></span>
							<span class="accessnum" v-if="v.accessnum">
								<i class="headset"></i>
								{{(v.accessnum/10000).toFixed(1)}}万
							</span>
						</div>
						<div class="textBox">
							<span class="text">{{v.Ftitle || v.songListDesc}}</span>
							<span class="text">{{v.songListAuthor || ''}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props:{
			sheetData:Array,
			tName:String,
		},
		data(){
			return {

			}
		}
	}
</script>

<style lang="less" scoped>
	#sheet{
		padding:0 6px;
		.title{
			font-size:16px;
			margin-bottom:11px;
			font-weight:normal;
			padding-left:6px;
		}
		.sheetBox{
			width:100%;
			.sheetList{
				width:100%;
				overflow:hidden;
				.item{
					float:left;
					width:50%;
					padding:0 4px;
					margin-bottom:10px;
					.bigBox{
						background:#fff;
						.imgBox{
							width:100%;
							margin-bottom:5px;
							position: relative;
							img{
								display: block;
								width:100%;
							}
							.playIcon{
								position: absolute;
								width:24px;
								height:24px;
								bottom:5px;
								right:5px;
								background:url(../assets/img/list_sprite.png) no-repeat;
								background-size: 24px 60px;
							}
							.accessnum{
								position:absolute;
								left:5px;
								bottom:5px;
								color:#fff;
								i{
									display: inline-block;
									width:10px;
									height:10px;
									background:url(../assets/img/list_sprite.png) no-repeat;
									background-size: 24px 60px;
									background-position:0 -50px;
								}
							}
						}
						.textBox{
							height:44px;
							padding:0 7px 5px;
							.text{
								font-size:14px;
								display: block;
								overflow:hidden;
								white-space:nowrap;
								text-overflow:ellipsis;
								&:last-child{
									font-size:12px;
								}
							}

						}
					}
					
				}
			}
		}
	}
</style>